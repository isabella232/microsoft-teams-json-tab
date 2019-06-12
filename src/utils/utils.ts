import * as microsoftTeams from '@microsoft/teams-js';
import { ICard, BotResponse } from '../api/api.interface';
import * as queryString from 'query-string';

export const launchTaskModule = ( card: ICard ) => {

    // Only open task module if card is an Adaptive Card
     if ( card.content.type && card.content.type === 'AdaptiveCard' ) {
        const taskInfo: microsoftTeams.TaskInfo = {
            height: undefined,
            width: undefined,
            title: card.preview.heroImageSrc,
            url: undefined,
            card: card.content
           }
        microsoftTeams.tasks.startTask( taskInfo );
     }
     else {
         alert( `Could not load data, ${ card.content.type } is not supported.` )
     }
}

// gets frame context from url
export const getFrameContext = ( iUrl: string ) => {
    const url = queryString.parseUrl( iUrl );
    return url.query.frameContext;
}

// converts a bot response to ICard
export const toICard = ( response: BotResponse ) => {
    const items: ICard[] = [];
    response.data.default.attachments.forEach( ( rawData: any ) => {
        const item = rawData.previewRawPayload;
        if ( item ){
            const { title, text, images } = item.content;
            const heroImageSrc = images[ 0 ].url ? images[ 0 ].url : '';
            const subTitle = text ? text : '';
            const card: ICard = {
                content: item.content,
                contentType: item.contentType,
                preview: {
                    title,
                    subTitle,
                    heroImageSrc
                }
            }
            items.push( card );
        }
    } );
    return items;
}
