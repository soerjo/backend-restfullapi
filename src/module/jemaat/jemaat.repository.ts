import {
  PageDto,
  PageMetaDto,
  PageOptionDto,
  SearchQueryDto,
} from 'src/common/dto';
import { EntityRepository, Repository } from 'typeorm';
import { Jemaat } from './entities/jemaat.entity';
import { keyofJemaat } from './type/keyofjemaat';

@EntityRepository(Jemaat)
export class JemaatRepository extends Repository<Jemaat> {
  async pagination(pageOptions: PageOptionDto, searchQuery: SearchQueryDto) {
    const { order, skip, take } = pageOptions;
    const { orderBy, search, word } = searchQuery;

    const queryBuilder = this.createQueryBuilder('jemaat');
    queryBuilder.skip(skip).take(take);

    if (keyofJemaat.some((val) => val === orderBy))
      queryBuilder.orderBy(`jemaat.${orderBy}`, order);

    if (keyofJemaat.some((val) => val === search) && word)
      queryBuilder.where(`jemaat.${search} LIKE :s`, { s: `%${word}%` });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });
    return new PageDto(entities, pageMetaDto);
  }
}
