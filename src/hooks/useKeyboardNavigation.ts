import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSelectedPosition } from '../store/slices/navigationSlice';

interface RowConfig {
  itemsPerRow: number;
  totalRows: number;
  totalItems: number;
}

export const useKeyboardNavigation = ({ itemsPerRow, totalRows, totalItems }: RowConfig) => {
  const dispatch = useDispatch();
  const selectedPosition = useSelector((state: RootState) => state.navigation.selectedPosition);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const current = { ...selectedPosition };

      switch (e.key) {
        case 'ArrowRight':
          current.column = (current.column + 1) % totalItems;
          break;
        case 'ArrowLeft':
          current.column = current.column - 1 < 0 ? totalItems - 1 : current.column - 1;
          break;
        case 'ArrowUp':
          if (current.row > 0) {
            current.row -= 1;
            // Find and scroll to the row
            const rowElement = document.querySelector(`[data-row-index="${current.row}"]`);
            if (rowElement) {
              rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          break;
        case 'ArrowDown':
          if (current.row < totalRows - 1) {
            current.row += 1;
            // Find and scroll to the row
            const rowElement = document.querySelector(`[data-row-index="${current.row}"]`);
            if (rowElement) {
              rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          break;
        default:
          return;
      }

      dispatch(setSelectedPosition(current));
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPosition, itemsPerRow, totalRows, totalItems, dispatch]);

  return selectedPosition;
};