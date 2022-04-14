import { IAllReducerProps } from './types';

export function store2Props({ registerMain }: any): IAllReducerProps {
  return {
    main: registerMain
  };
}