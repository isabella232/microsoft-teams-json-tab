import React from 'react';
import { Flex, Segment, Text, Ref } from '@stardust-ui/react';
import { ICard } from '../api/api.interface';
import { stripHTML, launchTaskModule } from '../utils/utils';
import '../css/App.css';
import { Overflow } from './Overflow';
import { CustomImage } from './CustomImage';
import { ThemeContext } from '../utils/themeContext';

export interface IGridItemProps {
  item: ICard;
}

export const GridItem: React.FC<IGridItemProps> = (props: IGridItemProps): JSX.Element => {
  const currentTheme = React.useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).removeEventListener('contextmenu', handleContextMenu);
    setMenuOpen(true);
  };

  const onBlur = (e: React.FocusEvent) => {
    (e.currentTarget as HTMLElement).removeEventListener('contextmenu', handleContextMenu);
    setMenuOpen(false);
  };

  const onFocus = (e: React.FocusEvent) => {
    (e.currentTarget as HTMLElement).addEventListener('contextmenu', handleContextMenu);
  };

  return (
    <Segment
      data-is-focusable="true"
      styles={{
        margin: '0 0 16px 12px',
        height: '146px',
        padding: '20px 20px 20px 20px',
        borderRadius: '3px',
        boxShadow: '0px 2px 4px -0.75px rgba(0,0,0,0.1)',
        position: 'relative',
        border: `2px solid ${currentTheme.border}`,
      }}
      onClick={(): void => launchTaskModule(props.item)}
      onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          launchTaskModule(props.item);
        }
      }}
      onFocus={event => onFocus(event)}
      onBlur={event => onBlur(event)}
    >
      {props.item.content.actions ? (
        <Overflow
          openMenu={menuOpen}
          card={props.item}
          styles={{ position: 'absolute', right: '0', top: '0', margin: '0 8px 0px 0px' }}
        />
      ) : null}
      <Flex gap="gap.small">
        <Flex.Item>
          <CustomImage width="48px" className="listItemImage" src={props.item.preview.heroImageSrc} />
        </Flex.Item>
        <Flex.Item size="size.half" grow>
          <Flex column styles={{ textAlign: 'left' }}>
            <Flex.Item
              styles={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}
            >
              <Text
                content={stripHTML(props.item.preview.title)}
                styles={{ margin: '0 0 2px 0' }}
                size="medium"
                weight="semibold"
                title={stripHTML(props.item.preview.title)}
              />
            </Flex.Item>
            {props.item.preview.subTitle ? (
              <Flex.Item
                styles={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                }}
              >
                <Text
                  content={stripHTML(props.item.preview.subTitle)}
                  styles={{ margin: '0 0 2px 0' }}
                  weight="regular"
                  size="medium"
                  title={stripHTML(props.item.preview.subTitle)}
                />
              </Flex.Item>
            ) : null}
            {props.item.preview.text ? (
              <Flex.Item
                grow
                size="size.half"
                styles={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden',
                }}
              >
                <Text
                  content={stripHTML(props.item.preview.text)}
                  weight="regular"
                  size="medium"
                  title={stripHTML(props.item.preview.text)}
                />
              </Flex.Item>
            ) : null}
          </Flex>
        </Flex.Item>
      </Flex>
    </Segment>
  );
};
