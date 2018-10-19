import { capitalize, join, lowerCase, map, slice } from 'lodash';

import {
    fromSnakeCaseToCamelCase, fromSnakeCaseToPascalCase, transformFromCamelCaseToSnakeCase,
    transformFromSnakeCaseToCamelCase, transformFromTo, transformKeys
} from '../src/transformKeys';

const testSubject = {
    a_key: [
        { a_different_key: 1 },
        { another_key: 'test' }
    ],
    a_nested_key: {
        nested_property: 3,
        more_nested_props: 2,
    }
};

describe('transform keys ', () => {
    it('Should apply a key transformation over an object', () => {

        const result = transformKeys((key) => {
            const parts = key.split('_');
            const allButFirst = map(slice(parts, 1), (str) => capitalize(str));
            return [parts[0], ...allButFirst].join('');
        }, testSubject);

        const expected = {
            aKey: [
                { aDifferentKey: 1 },
                { anotherKey: 'test' }
            ],
            aNestedKey: {
                nestedProperty: 3,
                moreNestedProps: 2,
            }
        };
        expect(result).toMatchObject(expected);


    });

    it('Should convert keys from snakeCase to camel case', () => {
        const result = transformKeys(fromSnakeCaseToCamelCase, testSubject);


        const expected = {
            aKey: [
                { aDifferentKey: 1 },
                { anotherKey: 'test' }
            ],
            aNestedKey: {
                nestedProperty: 3,
                moreNestedProps: 2,
            }
        };
        expect(result).toMatchObject(expected);
    });
    it('Should convert keys from snakeCase to pascal case', () => {
        const result = transformKeys(fromSnakeCaseToPascalCase, testSubject);

        const expected = {
            AKey: [
                { ADifferentKey: 1 },
                { AnotherKey: 'test' }
            ],
                ANestedKey: {
                NestedProperty: 3,
                    MoreNestedProps: 2,
            }
        };

        expect(result).toMatchObject(expected);
    });
    it('Should accept split and transform functions ', () => {
        const testSubject = {
            a_key: [
                { a_different_key: 1 },
                { another_key: 'test' }
            ],
            a_nested_key: {
                nested_property: 3,
                more_nested_props: 2,
            }
        };

        const pascalCase = transformFromTo((key: string) => key.split('_'),
            (parts: string[]) => join(map(parts, (p) => capitalize(p)), ''),
            testSubject);
        const snakeCase = transformFromTo((key: string) => key.split(/(?=[A-Z])/),
            (parts: string[]) => join(map(parts, (p) => lowerCase(p)), '_'),
            pascalCase);

        expect(testSubject).toMatchObject(snakeCase);

    });

    it('should work with shorthandMethods ', () => {


        const camelCase = transformFromSnakeCaseToCamelCase(testSubject);
        const snakeCase = transformFromCamelCaseToSnakeCase(camelCase);

        expect(testSubject).toMatchObject(snakeCase);

    });

});
