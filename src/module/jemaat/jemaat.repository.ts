import { PageDto, PageMetaDto, PageOptionDto } from 'src/common/dto';
import { EntityRepository, Repository } from 'typeorm';
import { ResponseDto } from './dto';
import { Jemaat } from './entities/jemaat.entity';
import { KeyofJemaat } from '../../common/type';

const someKey: KeyofJemaat[] = [
  'alamat',
  'baptis',
  'blesscomn',
  'email',
  'id',
  'jenis_kelamin',
  'kelompok_murid',
  'nama_lengkap',
  'nama_panggilan',
  'role',
  'tanggal_lahir',
  'tanggal_lahir_baru',
  'tempat_lahir',
  'wilayah_pelayanan',
  'created_at',
];

@EntityRepository(Jemaat)
export class JemaatRepository extends Repository<Jemaat> {
  async pagination(
    options: PageOptionDto,
    word?: string,
    search?: keyof Jemaat,
    orderBy: keyof Jemaat = 'created_at',
  ) {
    if (!someKey.includes(search) && search != undefined)
      throw new Error(`${search} is not in jemaat property`);
    if (!someKey.includes(orderBy) && orderBy != undefined)
      throw new Error(`${orderBy} is not in jemaat property`);

    const queryBuilder = this.createQueryBuilder('jemaat');

    queryBuilder
      .orderBy(`jemaat.${orderBy}`, options.order)
      .skip(options.skip)
      .take(options.take);

    if (search) {
      queryBuilder.where(`jemaat.${search} LIKE :s`, { s: `%${word}%` });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions: options });

    const data = new PageDto(entities, pageMetaDto);
    return new ResponseDto({ data });
  }
}
