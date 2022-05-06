import { Jemaat } from '../entities/jemaat.entity';

export type KeyofJemaat = keyof Jemaat;
export const keyofJemaat: KeyofJemaat[] = [
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
