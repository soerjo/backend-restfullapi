import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  constructor(public data: T[], public meta: PageMetaDto) {}
}
