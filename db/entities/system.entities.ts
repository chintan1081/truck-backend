import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OwnedEntity } from "./base.entity";

@Entity("app_settings")
export class SettingsEntity extends OwnedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "boolean", default: true })
  dieselApprovalRequired!: boolean;

  @Column({ type: "boolean", default: true })
  limitStrictEnforcement!: boolean;

  @Column({ type: "varchar", nullable: true })
  companyName?: string;

  @Column({ type: "varchar", nullable: true })
  companyEmail?: string;

  @Column({ type: "varchar", nullable: true })
  companyContact?: string;

  @Column({ type: "varchar", nullable: true })
  companyWhatsapp?: string;

  @Column({ type: "varchar", nullable: true })
  companyAddress?: string;

  @Column("simple-json", { nullable: true })
  companyServices!: string[];

  @Column({ type: "varchar", nullable: true })
  companyGst?: string;

  @Column({ type: "text", nullable: true })
  companyLogo?: string;

  @Column({ type: "text", nullable: true })
  companySignature?: string;

  @Column({ type: "simple-json", nullable: true })
  bankDetails?: object[];
}

@Entity("custom_alerts")
export class CustomAlertEntity extends OwnedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  title!: string;

  @Column("varchar")
  description!: string;

  @Column("varchar")
  category!: string;

  @Column("varchar")
  urgency!: string;

  @Column("varchar")
  date!: string;

  @Column({ type: "varchar", nullable: true })
  truckId?: string;

  @Column({ type: "boolean", default: false })
  isResolved!: boolean;
}
