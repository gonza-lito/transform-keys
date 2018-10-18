import { capitalize, curry, isArray, join, keys, lowerCase, map, reduce, slice } from 'lodash';

export type splitFunc = (key: string) => string[];
export type transformFunc = (split: splitFunc, transformation: transformationFunc, key) => string;

export type transformationFunc = (parts: string[]) => string;

export const transform: transformFunc = (split: splitFunc, transformation: transformationFunc, key: string): string => {
    const parts = split(key);
    return transformation(parts);
};

export const toCamelCase = (split: splitFunc, key: string): string => {
    return transform(split, (parts: string[]) => {
        const allButFirst = map(slice(parts, 1), (str) => capitalize(str));
        return [parts[0], ...allButFirst].join('');
    }, key);
};

export const toPascalCase = (split: splitFunc, key: string): string => {
    return transform(split, (parts: string[]) => {
        const capitalized = map(parts, (str) => capitalize(str));
        return join(capitalized, '');
    }, key);
};
export const fromSnakeCaseToCamelCase = (key: string): string => {
    return toCamelCase((sourceKey: string) => sourceKey.split('_'), key);
};
export const fromSnakeCaseToPascalCase = (key: string): string => {
    return toPascalCase((sourceKey: string) => sourceKey.split('_'), key);
};

export const transformFromCamelCaseToSnakeCase = (object: any) => {
    return transformFromTo((key: string) => key.split(/(?=[A-Z])/),
        (parts: string[]) => join(map(parts, (p) => lowerCase(p)), '_'),
        object);
};

export const transformFromSnakeCaseToCamelCase = (object: any) => {
    return transformKeys(fromSnakeCaseToCamelCase, object);
};

export const transformFromTo = (sourceForm: splitFunc, transformation: transformationFunc, object: any) => {
    const curriedTransform = curry(transform);
    return transformKeys(curriedTransform(sourceForm, transformation), object);
};

export function transformKeys<TSource, TDestination>(transformation: (sourceKey: string) => string, object: TSource): TDestination | TDestination[] {

    const curriedSelf = curry(transformKeys);
    if (isArray(object)) { return map(object, curriedSelf(transformation)) as TDestination[]; }
    if (typeof object !== 'object') { return object as unknown as TDestination; }
    const objectKeys = keys(object);
    return reduce(objectKeys, (newObj, key) => {
        const newKey = transformation(key);
        const value = object[key];
        const newValue = transformKeys(transformation, value);
        newObj[newKey] = newValue;
        return newObj;
    }, {}) as TDestination;
}
