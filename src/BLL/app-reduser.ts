
 const initialState = {
    isInitialized: false,
    isRequestProcessing: false,
    appError: null as string | null,
};
export type InitialStateType = typeof initialState;

// --------------Action Creators-----------------------
 export const setIsInitializedAC = (isInitialized: boolean) =>
     ({
         type: "APP/SET-IS-INITIALIZED",
         isInitialized,
     } as const);
 export const setIsRequestProcessingStatusAC = (isRequestProcessing: boolean) =>
     ({
         type: "APP/SET-IS-REQUEST-PROCESSING-STATUS",
         isRequestProcessing,
     } as const);
 export const setAppErrorAC = (appError: string | null) =>
     ({ type: "APP/SET-APP-ERROR", appError } as const);