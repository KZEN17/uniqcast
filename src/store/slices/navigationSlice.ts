import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridPosition } from '../../types';


interface NavigationState {
  selectedPosition: GridPosition;
  hoveredPosition: GridPosition;
  currentSection: string;
}

const initialState: NavigationState = {
  selectedPosition: { row: 0, column: 0 },
  hoveredPosition: { row: 0, column: 0 },
  currentSection: 'home'
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setSelectedPosition: (state, action: PayloadAction<GridPosition>) => {
      state.selectedPosition = action.payload;
    },
    setHoveredPosition: (state, action: PayloadAction<GridPosition>) => {
      state.hoveredPosition = action.payload;
      state.selectedPosition = action.payload; 
    },
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSection = action.payload;
    }
  }
});

export const { setSelectedPosition, setHoveredPosition, setCurrentSection } = navigationSlice.actions;
export default navigationSlice.reducer;