export const gender = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'nonbinary',
      label: 'Non-Binary',
    },
];

export const age_range = [
    {
        value: '<18',
        label: '<18',
    },
    {
        value: '18-24',
        label: '18-24',
    },
    {
        value: '25-29',
        label: '25-29',
    },
    {
        value: '30-39',
        label: '30-39',
    },
    {
        value: '40-49',
        label: '40-49',
    },
    {
        value: '50+',
        label: '50+',
    },
]

export const marital_status = [
{
    value: 'single',
    label: 'Single',
},
{
    value: 'attached',
    label: 'Attached',
},
{
    value: 'married',
    label: 'Married',
}
];

export class RegisterData {
    "username": string;
    "password": string;
    "age_range": string;
    "gender": string;
    "marital_status": string;
}

export class LoginData {
    "username": string;
    "password": string;
}