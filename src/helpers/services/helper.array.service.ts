import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { IHelperArrayService } from 'src/helpers/interfaces/helper.array-service.interface';
import { IHelperArrayRemove } from 'src/helpers/interfaces/helper.interface';

@Injectable()
export class HelperArrayService implements IHelperArrayService {
    getLeftByIndex<T>(array: T[], index: number): T {
        return _.nth(array, index);
    }

    getRightByIndex<T>(array: T[], index: number): T {
        return _.nth(array, -Math.abs(index));
    }

    getLeftByLength<T>(array: T[], length: number): T[] {
        return _.take(array, length);
    }

    getRightByLength<T>(array: T[], length: number): T[] {
        return _.takeRight(array, length);
    }

    getLast<T>(array: T[]): T {
        return _.last(array);
    }

    getFirst<T>(array: T[]): T {
        return _.head(array);
    }

    getFirstIndexByValue<T>(array: T[], value: T): number {
        return _.indexOf(array, value);
    }

    getLastIndexByValue<T>(array: T[], value: T): number {
        return _.lastIndexOf(array, value);
    }

    removeByValue<T>(array: T[], value: T): IHelperArrayRemove<T> {
        const removed = _.remove(array, function (n) {
            return n === value;
        });

        return { removed, arrays: array };
    }

    removeLeftByLength<T>(array: T[], length: number): T[] {
        return _.drop(array, length);
    }

    removeRightByLength<T>(array: Array<T>, length: number): T[] {
        return _.dropRight(array, length);
    }

    joinToString<T>(array: Array<T>, delimiter: string): string {
        return _.join(array, delimiter);
    }

    reverse<T>(array: T[]): T[] {
        return _.reverse(array);
    }

    unique<T>(array: T[]): T[] {
        return _.uniq(array);
    }

    shuffle<T>(array: T[]): T[] {
        return _.shuffle(array);
    }

    merge<T>(a: T[], b: T[]): T[] {
        return _.concat(a, b);
    }

    mergeUnique<T>(a: T[], b: T[]): T[] {
        return _.union(a, b);
    }

    filterIncludeByValue<T>(array: T[], value: T): T[] {
        return _.filter(array, (arr) => arr === value);
    }

    filterNotIncludeByValue<T>(array: T[], value: T): T[] {
        return _.without(array, value);
    }

    filterNotIncludeUniqueByArray<T>(a: T[], b: T[]): T[] {
        return _.xor(a, b);
    }

    filterIncludeUniqueByArray<T>(a: T[], b: T[]): T[] {
        return _.intersection(a, b);
    }

    equals<T>(a: T[], b: T[]): boolean {
        return _.isEqual(a, b);
    }

    notEquals<T>(a: T[], b: T[]): boolean {
        return !_.isEqual(a, b);
    }

    in<T>(a: T[], b: T[]): boolean {
        return _.intersection(a, b).length > 0;
    }

    notIn<T>(a: T[], b: T[]): boolean {
        return _.intersection(a, b).length == 0;
    }

    includes<T>(a: T[], b: T): boolean {
        return _.includes(a, b);
    }

    chunk<T>(a: T[], size: number): T[][] {
        return _.chunk<T>(a, size);
    }

    transformedDropdownArray<T>(iArray: T[], value: string, label: string) {
        const data = iArray.map(item => ({
            value: item[value],
            label: item[label],
        }));
        return data;
    }

    arrayToDropdown<T>(iArray: T[], keyname) {
        const uniqueArray = [...new Set(iArray.map(model => model[keyname]))];
        const data = uniqueArray.map(item => ({
            value: item,
            label: item,
        }));
        return data;
    }
    uniqiePincodesArray<T>(iArray: T[]) {
        const uniquePincodeData = iArray.reduce((acc: any, obj: any) => {
            const existingItem = acc.find((item: any) => (
                item.pincode === obj.pincode &&
                item.CityName === obj.CityName &&
                item.statename === obj.statename
            ));

            if (!existingItem) {
                acc.push(obj);
            }

            return acc;
        }, []);
        return uniquePincodeData
    }
    flattenArray<T>(iArray: T[]) {
        const flattenedArray = iArray.flat(Infinity);
        return flattenedArray;
    }

}