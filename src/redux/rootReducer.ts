import contacsReducer from './contactsSlice';

// As there is only one reducer the rootReducer is the contactsReducer
const rootReducer = contacsReducer;

// Root state type
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
