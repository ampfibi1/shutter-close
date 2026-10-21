import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity.js";
import type { Relation } from 'typeorm';
import { AuditEntityType } from "./enums/audit_entity_type.enum.js";

@Entity('admin_audit_logs')
@Index('IDX_admin_audit_logs_adminId', ['adminId', 'createdAt'])
@Index('IDX_admin_audit_logs_entity', ['entityType', 'entityId'])
export class AdminAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.auditLogs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'adminId' })
  admin: Relation<User> | null;

  @Column({ type: 'uuid', nullable: true })
  adminId: string | null;

  @Column({ type: 'varchar', length: 150 })
  action: string;

  @Column({
    type: 'enum',
    enum: AuditEntityType,
  })
  entityType: AuditEntityType;

  @Column({ type: 'varchar', length: 150, nullable: true })
  entityId: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}