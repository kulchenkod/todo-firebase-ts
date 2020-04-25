/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-redux-promise-listener' {
  import React from 'react';
  import { AnyAction } from 'redux';
  import { ReduxPromiseListener } from 'redux-promise-listener';

  type ActionMatcher = (action: AnyAction) => boolean;

  type Props = {
    listener: ReduxPromiseListener;
    start: string;
    resolve: string | ActionMatcher;
    reject: string | ActionMatcher;
    children: (asyncFunction: (_: any) => Promise<any>) => React.ReactElement;
    setPayload?: (action: AnyAction, payload: any) => AnyAction;
    getPayload?: (action: AnyAction) => any;
    getError?: (action: AnyAction) => any;
  };

  const MakeAsyncFunction: React.FC<Props>;

  export default MakeAsyncFunction;
}
