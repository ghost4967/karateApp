import { IService } from './IService';

export class TextViewService implements IService {

  constructor() { }

  getId = (): string => 'textViews';

  getTitle = (): string => 'Typo + small components';

  getAllThemes = (): Array<any> => {
    return [
      { "title": "All", "theme": "all" },
    ];
  };

  getEventsForTheme = (menuItem: any): any => {
    return {};
  };

  prepareParams = (item: any) => {
    return {
      title: item.title,
      data: [],
      events: this.getEventsForTheme(item)
    };
  };

  load(url: string) {
    return null;
  }
}
