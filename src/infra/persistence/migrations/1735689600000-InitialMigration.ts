import type { MigrationInterface, QueryRunner } from 'typeorm';

import { Table, TableForeignKey, TableIndex } from 'typeorm';

export class InitialMigration1735689600000 implements MigrationInterface {
  private async createUsersTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'verificationToken',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'verificationTokenExpiresAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'isEmailVerified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'passwordResetToken',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'passwordResetTokenExpiresAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  private async createUrlsTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'urls',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'originalUrl',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'shortUrl',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'isCustom',
            type: 'boolean',
            default: false,
          },
          {
            name: 'clickCount',
            type: 'integer',
            default: 0,
          },
          {
            name: 'expirationDate',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'owner_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  private async createForeignKeys(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'urls',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  private async createIndexes(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      'urls',
      new TableIndex({
        name: 'IDX_URLS_SHORT_URL',
        columnNames: ['shortUrl'],
      }),
    );

    await queryRunner.createIndex(
      'urls',
      new TableIndex({
        name: 'IDX_URLS_OWNER_ID',
        columnNames: ['owner_id'],
      }),
    );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID extension
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create tables
    await this.createUsersTable(queryRunner);
    await this.createUrlsTable(queryRunner);

    // Create foreign keys and indexes
    await this.createForeignKeys(queryRunner);
    await this.createIndexes(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.dropIndex('urls', 'IDX_URLS_OWNER_ID');
    await queryRunner.dropIndex('urls', 'IDX_URLS_SHORT_URL');
    await queryRunner.dropIndex('users', 'IDX_USERS_EMAIL');

    // Drop foreign keys
    const urlsTable = await queryRunner.getTable('urls');
    const foreignKey = urlsTable?.foreignKeys.find(
      fk => fk.columnNames.indexOf('owner_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('urls', foreignKey);
    }

    // Drop tables
    await queryRunner.dropTable('urls');
    await queryRunner.dropTable('users');
  }
}
