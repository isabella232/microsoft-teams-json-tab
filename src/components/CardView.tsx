import React from 'react';
import { Grid, gridBehavior, Ref } from '@stardust-ui/react';
import { IItemListProps } from './ListView';
import { ICard } from '../api/api.interface';
import '../css/App.css';
import { GridItem } from './GridItem';

export const CardView: React.FC<IItemListProps> = (props: IItemListProps): JSX.Element => {
  // CONSTANTS
  const minimumCardWidth = 278; //px

  // HELPER FUNCTION
  const calculateColumns = (width: number) => {
    return Math.floor(width / minimumCardWidth);
  };

  const [Height, setHeight] = React.useState(window.innerHeight);
  const updateHeight = () => {
    setHeight(window.innerHeight);
  };

  // EFFECT HOOKS
  React.useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [Height]);

  // STATE HOOKS
  const [Columns, setColumns] = React.useState(calculateColumns(window.innerWidth));

  // HANDLERS
  const updateColumn = () => {
    setColumns(calculateColumns(window.innerWidth));
  };

  // EFFECT HOOKS
  React.useEffect(() => {
    window.addEventListener('resize', updateColumn);
    return () => {
      window.removeEventListener('resize', updateColumn);
    };
  }, [Columns]);

  // Ref for first grid item
  const gridRef = React.createRef<any>();

  React.useEffect(() => {
    // If focus is true set focus to first element. Ignore otherwise
    if (props.focusFirst) {
      const firstElem = gridRef.current && (gridRef.current as HTMLElement).firstChild;

      if (firstElem) {
        (firstElem as HTMLElement).focus();
      }
    }
  });

  // ICARD PROCESSOR
  const processItem = (item: ICard): JSX.Element => {
    return <GridItem item={item}></GridItem>;
  };

  // RENDER
  return (
    <div style={{ margin: '0 0 0 8px', height: `${Height - 50}px`, overflow: 'scroll' }}>
      <Ref innerRef={gridRef}>
        <Grid id="grid-view" columns={Columns} accessibility={gridBehavior} content={props.itemList.map(processItem)} />
      </Ref>
    </div>
  );
};
