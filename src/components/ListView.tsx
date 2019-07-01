import React from 'react';
import { List, Image, Flex, Text } from '@stardust-ui/react';
import { ICard } from '../api/api.interface';
import { launchTaskModule, stripHTML } from '../utils/utils';

export interface IItemListProps {
  itemList: ICard[];
}

export interface IProcessedItem {
  key: number;
  content: JSX.Element;
  className: string;
  onClick: () => void;
}

export const ListView: React.FC<IItemListProps> = (props: IItemListProps): JSX.Element => {
  // Key count to ensure unique keys for every item
  let keyCount = 0;

  // Function to translate items from IPreviewCard to List.Item format
  const processItem = (item: ICard): IProcessedItem => {
    keyCount++;
    const out = {
      key: keyCount,
      content: (
        <Flex vAlign="center" fill gap="gap.small">
          <Flex.Item styles={{ width: '32px', height: '32px' }}>
            <Image src={item.preview.heroImageSrc} className="listItemImage" />
          </Flex.Item>
          <Flex.Item size="size.quarter">
            <Text size="medium" weight="bold" content={stripHTML(item.preview.title)} />
          </Flex.Item>
          {item.preview.subTitle ? (
            <Flex.Item grow size="size.half">
              <Text truncated size="medium" weight="regular" content={stripHTML(item.preview.subTitle)} />
            </Flex.Item>
          ) : null}
        </Flex>
      ),
      className: 'listItem',
      onClick: (): void => launchTaskModule(item),
    };
    return out;
  };

  // Output List for processed data
  // Call processing function on all items
  const outList = props.itemList.map(processItem);

  // Render selectable list
  return (
    <div>
      <List styles={{ backgroundColor: '#F1F2F3' }} selectable items={outList} />
    </div>
  );
};
