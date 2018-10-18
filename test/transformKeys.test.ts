import { capitalize, join, lowerCase, map, slice } from 'lodash';

import {
    fromSnakeCaseToCamelCase, fromSnakeCaseToPascalCase, transformFromCamelCaseToSnakeCase,
    transformFromSnakeCaseToCamelCase, transformFromTo, transformKeys
} from '../src/transformKeys';

const subject = {
    place: {
        address: {
            city: 'Rosario',
            country: 'Argentina',
            country_code: 'ar',
            full_address: 'Juan D Perón 2130',
            geo_location: {
                lat: -32.9553549,
                lng: -60.66474210000001,
            },
            number: '2130',
            state: 'santa fe',
            street: 'Juan D. Peron',
            zip_code: '2000',
        },
        app_config: {
            check_in: {
                qr_code: 'value',
                type: 'QR_CODE',
            },
            custom_fields: [
                {
                    display_text: 'Fecha nacimiento',
                    key: 'birth_date',
                    type: 'date',
                },
            ],
            disabled: false,
            identifications: [
                {
                    default: true,
                    key: 'dni',
                },
                {
                    key: 'dni-ext',
                }
            ],
            messages: [
                {
                    key: 'closed',
                    language: 'en',
                    text: 'We are closed.',
                },
                {
                    key: 'closed',
                    language: 'es',
                    text: 'Estamos cerrados, intente mas tarde',
                },
                {
                    key: 'degraded',
                    language: 'es',
                    text: 'Estamos teniendo problemas con nuestros servidores, para turnos llamar al 0800-10...',
                }
            ],
            requirements: {
                custom_fields: [
                    'birth_date',
                ],
                identification: true,
            },
            show_waiting_time: true,
            visible: true,
        },
        categories: [
            'stablishment',
        ],
        email: 'my@mail.com',
        google_place_id: 'googlePlaceId',
        images: [
            {
                type: 'banner',
                url: 'www.mycdn.com/pic.jpg',
            },
            {
                type: 'photo',
                url: 'www.mycdn.com/pic.jpg',
            },
            {
                type: 'thumbnail',
                url: 'www.mycdn.com/pic.jpg',
            }
        ],
        language: 'es',
        name: 'a Place Name',
        organization: {
            id: 'oi4joij5oij7oij7oij8',
            name: 'An organization',
        },
        phones: [
            '+54 9 341 4406974',
        ],
        place_id: 'pru',
        timezone: 'America/Argentina/Buenos_Aires',
        website: 'www.website.com',
    },
};

describe('transform keys ', () => {
    it('Should apply a key transformation over an object', () => {

        const result = transformKeys((key) => {
            const parts = key.split('_');
            const allButFirst = map(slice(parts, 1), (str) => capitalize(str));
            return [parts[0], ...allButFirst].join('');
        }, subject);

        const expected = {
            place: {
                address: {
                    city: 'Rosario',
                    country: 'Argentina',
                    countryCode: 'ar',
                    fullAddress: 'Juan D Perón 2130',
                    geoLocation: {
                        lat: -32.9553549,
                        lng: -60.66474210000001,
                    },
                    number: '2130',
                    state: 'santa fe',
                    street: 'Juan D. Peron',
                    zipCode: '2000',
                },
                appConfig: {
                    checkIn: {
                        qrCode: 'value',
                        type: 'QR_CODE',
                    },
                    customFields: [
                        {
                            displayText: 'Fecha nacimiento',
                            key: 'birth_date',
                            type: 'date',
                        },
                    ],
                    disabled: false,
                    identifications: [
                        {
                            default: true,
                            key: 'dni',
                        },
                        {
                            key: 'dni-ext',
                        }
                    ],
                    messages: [
                        {
                            key: 'closed',
                            language: 'en',
                            text: 'We are closed.',
                        },
                        {
                            key: 'closed',
                            language: 'es',
                            text: 'Estamos cerrados, intente mas tarde',
                        },
                        {
                            key: 'degraded',
                            language: 'es',
                            text: 'Estamos teniendo problemas con nuestros servidores, para turnos llamar al 0800-10...',
                        }
                    ],
                    requirements: {
                        customFields: [
                            'birth_date',
                        ],
                        identification: true,
                    },
                    showWaitingTime: true,
                    visible: true,
                },
                categories: [
                    'stablishment',
                ],
                email: 'my@mail.com',
                googlePlaceId: 'googlePlaceId',
                images: [
                    {
                        type: 'banner',
                        url: 'www.mycdn.com/pic.jpg',
                    },
                    {
                        type: 'photo',
                        url: 'www.mycdn.com/pic.jpg',
                    },
                    {
                        type: 'thumbnail',
                        url: 'www.mycdn.com/pic.jpg',
                    }
                ],
                language: 'es',
                name: 'a Place Name',
                organization: {
                    id: 'oi4joij5oij7oij7oij8',
                    name: 'An organization',
                },
                phones: [
                    '+54 9 341 4406974',
                ],
                placeId: 'pru',
                timezone: 'America/Argentina/Buenos_Aires',
                website: 'www.website.com',
            },
        };
        expect(result).toMatchObject(expected);


    });

    it('Should convert keys from snakeCase to camel case', () => {
        const result = transformKeys(fromSnakeCaseToCamelCase, subject);

        const expected = {
            place: {
                address: {
                    city: 'Rosario',
                    country: 'Argentina',
                    countryCode: 'ar',
                    fullAddress: 'Juan D Perón 2130',
                    geoLocation: {
                        lat: -32.9553549,
                        lng: -60.66474210000001,
                    },
                    number: '2130',
                    state: 'santa fe',
                    street: 'Juan D. Peron',
                    zipCode: '2000',
                },
                appConfig: {
                    checkIn: {
                        qrCode: 'value',
                        type: 'QR_CODE',
                    },
                    customFields: [
                        {
                            displayText: 'Fecha nacimiento',
                            key: 'birth_date',
                            type: 'date',
                        },
                    ],
                    disabled: false,
                    identifications: [
                        {
                            default: true,
                            key: 'dni',
                        },
                        {
                            key: 'dni-ext',
                        }
                    ],
                    messages: [
                        {
                            key: 'closed',
                            language: 'en',
                            text: 'We are closed.',
                        },
                        {
                            key: 'closed',
                            language: 'es',
                            text: 'Estamos cerrados, intente mas tarde',
                        },
                        {
                            key: 'degraded',
                            language: 'es',
                            text: 'Estamos teniendo problemas con nuestros servidores, para turnos llamar al 0800-10...',
                        }
                    ],
                    requirements: {
                        customFields: [
                            'birth_date',
                        ],
                        identification: true,
                    },
                    showWaitingTime: true,
                    visible: true,
                },
                categories: [
                    'stablishment',
                ],
                email: 'my@mail.com',
                googlePlaceId: 'googlePlaceId',
                images: [
                    {
                        type: 'banner',
                        url: 'www.mycdn.com/pic.jpg',
                    },
                    {
                        type: 'photo',
                        url: 'www.mycdn.com/pic.jpg',
                    },
                    {
                        type: 'thumbnail',
                        url: 'www.mycdn.com/pic.jpg',
                    }
                ],
                language: 'es',
                name: 'a Place Name',
                organization: {
                    id: 'oi4joij5oij7oij7oij8',
                    name: 'An organization',
                },
                phones: [
                    '+54 9 341 4406974',
                ],
                placeId: 'pru',
                timezone: 'America/Argentina/Buenos_Aires',
                website: 'www.website.com',
            },
        };
        expect(result).toMatchObject(expected);
    });
    it('Should convert keys from snakeCase to pascal case', () => {
        const result = transformKeys(fromSnakeCaseToPascalCase, subject);

        const expected = {
            Place: {
                Address: {
                    City: 'Rosario',
                    Country: 'Argentina',
                    CountryCode: 'ar',
                    FullAddress: 'Juan D Perón 2130',
                    GeoLocation: {
                        Lat: -32.9553549,
                        Lng: -60.66474210000001,
                    },
                    Number: '2130',
                    State: 'santa fe',
                    Street: 'Juan D. Peron',
                    ZipCode: '2000',
                },
                AppConfig: {
                    CheckIn: {
                        QrCode: 'value',
                        Type: 'QR_CODE',
                    },
                    CustomFields: [
                        {
                            DisplayText: 'Fecha nacimiento',
                            Key: 'birth_date',
                            Type: 'date',
                        },
                    ],
                    Disabled: false,
                    Identifications: [
                        {
                            Default: true,
                            Key: 'dni',
                        },
                        {
                            Key: 'dni-ext',
                        }
                    ],
                    Messages: [
                        {
                            Key: 'closed',
                            Language: 'en',
                            Text: 'We are closed.',
                        },
                        {
                            Key: 'closed',
                            Language: 'es',
                            Text: 'Estamos cerrados, intente mas tarde',
                        },
                        {
                            Key: 'degraded',
                            Language: 'es',
                            Text: 'Estamos teniendo problemas con nuestros servidores, para turnos llamar al 0800-10...',
                        }
                    ],
                    Requirements: {
                        CustomFields: [
                            'birth_date',
                        ],
                        Identification: true,
                    },
                    ShowWaitingTime: true,
                    Visible: true,
                },
                Categories: [
                    'stablishment',
                ],
                Email: 'my@mail.com',
                GooglePlaceId: 'googlePlaceId',
                Images: [
                    {
                        Type: 'banner',
                        Url: 'www.mycdn.com/pic.jpg',
                    },
                    {
                        Type: 'photo',
                        Url: 'www.mycdn.com/pic.jpg',
                    },
                    {
                        Type: 'thumbnail',
                        Url: 'www.mycdn.com/pic.jpg',
                    }
                ],
                Language: 'es',
                Name: 'a Place Name',
                Organization: {
                    Id: 'oi4joij5oij7oij7oij8',
                    Name: 'An organization',
                },
                Phones: [
                    '+54 9 341 4406974',
                ],
                PlaceId: 'pru',
                Timezone: 'America/Argentina/Buenos_Aires',
                Website: 'www.website.com',
            },
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

        const camelCase = transformFromSnakeCaseToCamelCase(testSubject);
        const snakeCase = transformFromCamelCaseToSnakeCase(camelCase);

        expect(testSubject).toMatchObject(snakeCase);

    });

});
