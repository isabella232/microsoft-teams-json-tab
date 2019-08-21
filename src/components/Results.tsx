import React from 'react';
import { ListView } from './ListView';
import { CardView } from './CardView';
import { ICard } from '../api/api.interface';

export interface IResultState {
  results: ICard[];
  viewOption: string;
  focusFirst: boolean;
}
enum viewOption {
  List = 'List',
  Grid = 'Grid',
}

export const Results: React.FC<IResultState> = (props: IResultState): JSX.Element => {
  // React.useEffect(() => {
  //   //If focus is true set focus to first element. Ignore otherwise
  //   alert('focus: ' + props.focusFirst);
  // });

  return (
    <div>
      {props.viewOption === viewOption.List ? (
        <ListView itemList={props.results} focusFirst={props.focusFirst} />
      ) : (
        <CardView itemList={props.results} focusFirst={props.focusFirst} />
      )}
    </div>
  );
};
