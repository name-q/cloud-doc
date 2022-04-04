import { IAllReducerProps } from './types';

export function store2Props({ loginMain }: any): IAllReducerProps {
  return {
    main: loginMain
  };
}