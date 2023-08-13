import { Role } from 'src/auth/roles/entities/role.entity'
import { UsersProfiles } from 'src/users_profiles/entities/users_profiles.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  password: string

  @OneToOne(() => UsersProfiles)
  profile: UsersProfiles

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
