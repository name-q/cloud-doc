import { IAllReducerProps } from './types';

export function store2Props({ createZJMain }: any): IAllReducerProps {
  return {
    main: createZJMain
  };
}