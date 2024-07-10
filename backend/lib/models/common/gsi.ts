export interface Gsi1 {
    gsi1_pk(): string;
    gsi1_sk(): string;
}

export function hasGSI1(item: object): item is Gsi1 {
    return 'gsi1_pk' in item && 'gsi1_sk' in item;
}
