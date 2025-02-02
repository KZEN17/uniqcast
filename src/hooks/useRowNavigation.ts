import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPosition } from '../store/slices/navigationSlice';
import { RootState } from '../store';

interface RowNavigationConfig {
  itemsPerRow: number;
  totalItems: number;
  rowIndex: number;
}

export const useRowNavigation = ({ itemsPerRow, totalItems, rowIndex }: RowNavigationConfig) => {
  const [virtualStartIndex, setVirtualStartIndex] = useState(0);
  const dispatch = useDispatch();
  
  const selectedPosition = useSelector((state: RootState) => state.navigation.selectedPosition);
  const isRowSelected = selectedPosition.row === rowIndex;
  const selectedIndexInRow = isRowSelected ? selectedPosition.column : -1;

  const handleNavigation = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (!isRowSelected && !['up', 'down'].includes(direction)) return;

    switch (direction) {
      case 'right': {
        const newIndex = selectedPosition.column + 1;
        dispatch(setSelectedPosition({ row: rowIndex, column: newIndex }));
        
        if (newIndex >= virtualStartIndex + itemsPerRow) {
          setVirtualStartIndex(newIndex - itemsPerRow + 1);
        }
        break;
      }
      case 'left': {
        if (selectedPosition.column <= 0) return;
        
        const newIndex = selectedPosition.column - 1;
        dispatch(setSelectedPosition({ row: rowIndex, column: newIndex }));
        
        if (newIndex < virtualStartIndex) {
          setVirtualStartIndex(newIndex);
        }
        break;
      }
      case 'up':
      case 'down':
        if ((direction === 'up' && rowIndex === selectedPosition.row - 1) ||
            (direction === 'down' && rowIndex === selectedPosition.row + 1)) {
          const currentRelativeIndex = selectedPosition.column - virtualStartIndex;
          const newColumn = virtualStartIndex + Math.min(currentRelativeIndex, itemsPerRow - 1);
          
          dispatch(setSelectedPosition({ 
            row: rowIndex,
            column: newColumn
          }));
        }
        break;
    }
  }, [selectedPosition, rowIndex, virtualStartIndex, itemsPerRow, isRowSelected, dispatch]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          handleNavigation('right');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleNavigation('left');
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleNavigation('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleNavigation('down');
          break;
      }
    };
    // event listener for the keydown press
    window.addEventListener('keydown', handleKeyPress);
    // cleanup
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNavigation]);

  const getVisibleItems = useCallback((items: any[]) => {
    if (!items || items.length === 0) return [];
    
    const visibleItems = [];
    let currentIndex = virtualStartIndex;
    
    for (let i = 0; i < itemsPerRow; i++) {
      const actualIndex = Math.abs(currentIndex % totalItems);
      if (!items[actualIndex]) break;
      
      visibleItems.push({
        item: items[actualIndex],
        virtualIndex: currentIndex
      });
      currentIndex++;
    }
    
    return visibleItems;
  }, [virtualStartIndex, itemsPerRow, totalItems]);

  return { 
    selectedIndex: selectedIndexInRow,
    visibleItems: getVisibleItems,
    handleMouseEnter: (index: number) => 
      dispatch(setSelectedPosition({ row: rowIndex, column: index })),
    startIndex: virtualStartIndex
  };
};