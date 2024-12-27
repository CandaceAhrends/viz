import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  selectedMenu: string;
}

const initialState: NavigationState = {
  selectedMenu: '/',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    selectMenu: (state, action: PayloadAction<string>) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { selectMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
