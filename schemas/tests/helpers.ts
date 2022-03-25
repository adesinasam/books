import Account from '../app/Account.json';
import Customer from '../app/Customer.json';
import JournalEntry from '../app/JournalEntry.json';
import JournalEntryAccount from '../app/JournalEntryAccount.json';
import Party from '../app/Party.json';
import PartyRegional from '../regional/in/Party.json';
import { Schema, SchemaStub, SchemaStubMap } from '../types';

interface AppSchemaMap extends SchemaStubMap {
  Account: SchemaStub;
  JournalEntry: SchemaStub;
  JournalEntryAccount: SchemaStub;
  Party: SchemaStub;
  Customer: SchemaStub;
}

interface RegionalSchemaMap extends SchemaStubMap {
  Party: SchemaStub;
}

export function getTestSchemaMap(): {
  appSchemaMap: AppSchemaMap;
  regionalSchemaMap: RegionalSchemaMap;
} {
  const appSchemaMap = {
    Account,
    JournalEntry,
    JournalEntryAccount,
    Party,
    Customer,
  } as AppSchemaMap;
  const regionalSchemaMap = { Party: PartyRegional } as RegionalSchemaMap;

  return {
    appSchemaMap,
    regionalSchemaMap,
  };
}

export function everyFieldExists(fieldList: string[], schema: Schema): boolean {
  return fieldsExist(fieldList, schema, 'every');
}

export function someFieldExists(fieldList: string[], schema: Schema): boolean {
  return fieldsExist(fieldList, schema, 'some');
}

function fieldsExist(
  fieldList: string[],
  schema: Schema,
  type: 'every' | 'some'
): boolean {
  const schemaFieldNames = schema.fields.map((f) => f.fieldname);
  return fieldList.map((f) => schemaFieldNames.includes(f))[type](Boolean);
}

export function subtract(
  targetList: string[],
  ...removalLists: string[][]
): string[] {
  const removalList = removalLists.flat();
  return targetList.filter((f) => !removalList.includes(f));
}
