import { type Page } from '@playwright/test';
import { ContentListPage } from './content-list.page';

export class GalleryPage extends ContentListPage {
  constructor(page: Page) {
    super(page, 'Gallery Events');
  }

  async clickManageMedia(rowIndex: number) {
    const rows = await this.getRows();
    await rows[rowIndex]
      .getByRole('button', { name: /manage media|media/i })
      .click();
  }
}
