/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { IHelperArrayRemove } from 'src/helpers/interfaces/helper.interface';
import { compareSync } from 'bcryptjs';
import { ValidationError } from 'class-validator';
import {
    IErrors,
    IErrorsImport,
    IValidationErrorImport,
} from 'src/helpers/interfaces/error.interface';
import {
    IMessageErrorOptions,
    IMessageOptions,
    IMessageSetOptions,
} from 'src/helpers/interfaces/message.interface';
import moment from 'moment';
import {IHelperDateOptionsCreate} from 'src/helpers/interfaces/helper.interface';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import * as Paytm from 'paytmchecksum';
@Injectable()
export class HelperService {
    private transporter: nodemailer.Transporter;
    private readonly apiUrl = 'https://msg.wemonde.com/api/sendSMS';
    private readonly apiKey = 'f2fdee93271556e428dd9507b3da7235';
    private readonly senderId = 'InfSLD';
    private readonly route = '12'; // You can adjust the route as needed
    private readonly jwtService: JwtService
    constructor() {
        // Create a transporter using SMTP transport
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', // e.g., 'Gmail', 'Outlook'
            auth: {
                user: 'no-reply@infinityassurance.com', // Your email address
                pass: 'Infinity@no-reply@24@', // Your email password or app-specific password
            },
        });
    }
    /*======== Message Service ============*/
    getAvailableLanguages(): string[] {
        return ['en'];
    }

    getLanguage(): string {
        return 'en';
    }

    filterLanguage(customLanguages: string[]): string[] {
        return this.filterIncludeUniqueByArray(
            customLanguages,
            ['en']
        );
    }

    setMessage(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        lang: string,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        key: string,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options?: IMessageSetOptions
    ): string {
        return 'en';
    }

    getRequestErrorsMessage(
        requestErrors: ValidationError[],
        options?: IMessageErrorOptions
    ): IErrors[] {
        const messages: Array<IErrors[]> = [];
        for (const requestError of requestErrors) {
            let children: Record<string, any>[] = requestError.children;
            let constraints: string[] = Object.keys(requestError.constraints);
            let property: string = requestError.property;
            let propertyValue: string = requestError.value;

            while (children.length > 0) {
                property = `${property}.${children[0].property}`;

                if (children[0].children?.length > 0) {
                    children = children[0].children;
                } else {
                    constraints = Object.keys(children[0].constraints);
                    propertyValue = children[0].value;
                    children = [];
                }
            }

            const errors: IErrors[] = [];
            for (const constraint of constraints) {
                errors.push({
                    property,
                    message: this.get(`request.${constraint}`, {
                        customLanguages: options?.customLanguages,
                        properties: {
                            property,
                            value: propertyValue,
                        },
                    }),
                });
            }

            messages.push(errors);
        }

        return messages.flat(1) as IErrors[];
    }

    getImportErrorsMessage(
        errors: IValidationErrorImport[],
        options?: IMessageErrorOptions
    ): IErrorsImport[] {
        return errors.map((val) => ({
            row: val.row,
            file: val.file,
            errors: this.getRequestErrorsMessage(val.errors, options),
        }));
    }

    get<T = string>(key: string, options?: IMessageOptions): T {
        const customLanguages =
            options?.customLanguages?.length > 0
                ? this.filterLanguage(options.customLanguages)
                : ['en'];

        if (customLanguages.length > 1) {
            return customLanguages.reduce(
                (a, v) => ({
                    ...a,
                    [v]: this.setMessage(v, key, {
                        properties: options?.properties,
                    }),
                }),
                {}
            ) as any;
        }

        return this.setMessage(customLanguages[0], key, {
            properties: options?.properties,
        }) as any;
    }


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
    /*============= Date Services =============*/
    timestamp(
        date?: string | number | Date,
        options?: IHelperDateOptionsCreate
    ): number {
        const mDate = moment(date ?? undefined);

        if (options?.startOfDay) {
            mDate.startOf('day');
        }

        return mDate.valueOf();
    }

    /*===== Send Email Service ========*/
    async sendEmail(template: string, data: any, to: string, subject: string) {
        const compiledTemplate = handlebars.compile(template)(data);
        const mailOptions = {
            from: 'no-reply@infinityassurance.com',
            to,
            subject,
            html: compiledTemplate,
        };
        try {
            const response = await this.transporter.sendMail(mailOptions);
            if (response.messageId) {
                return 'Email sent successfully';
            }
        } catch (error) {
            return error
        }
    }

    generateRandomNumber(): number {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async sendSms(number: string, message: string, contentTemplateId: string) {
        try {
            const response = await axios.get('https://msg.wemonde.com/api/sendSMS', {
                params: {
                    token: 'f2fdee93271556e428dd9507b3da7235',
                    senderid: 'ISHILD',
                    route: '14',
                    number,
                    message,
                    contentID: contentTemplateId,
                },
            });

            // Check the response and handle accordingly
            if (response.status === 200) {
                return 'SMS sent successfully';
            } else {
                throw new Error('Failed to send SMS');
            }
        } catch (error) {
            throw error;
        }
    }
    async getLastSixDigits(inputString: string): Promise<string> {
        if (inputString.length <= 6) {
            return inputString; // Return the entire input if it has 6 or fewer characters
        } else {
            return inputString.substring(inputString.length - 6); // Return the last six characters
        }
    }
    async getLastSixDigitss(inputString: string): Promise<string> {
        if (inputString.length <= 6) {
            return inputString; // Return the entire input if it has 6 or fewer characters
        } else {
            return inputString.substring(inputString.length - 6); // Return the last six characters
        }
    }
    async paymentconfirmation(): Promise<string> {
    
        return "This is a confirmation that we have just received your secure online payment. Thank you for your trust.";

    
        }
    
    

    async daysDifferencefromDate(date: string | Date) {
        const invoiceDate = new Date(date);
        const currentDate = new Date();
        const timeDifferenceMs = currentDate.getTime() - invoiceDate.getTime();
        const daysDifference = Math.floor(timeDifferenceMs / (1000 * 3600 * 24));
        return daysDifference
    }
    /*==== Hash Services */
    bcryptCompare(passwordString: string, passwordHashed: string): boolean {
        return compareSync(passwordString, passwordHashed);
    }

    async convertDateString(date: string | Date) {
        const isoDate = new Date(date);
        const day = isoDate.getDate().toString().padStart(2, '0');
        const month = (isoDate.getMonth() + 1).toString().padStart(2, '0');
        const year = isoDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    async replaceLastThreeWithAsteriskss(inputString) {
        if (inputString.length < 3) {
            return '***';
        } else {
            const lastThreeChars = inputString.substring(inputString.length - 3);
            const asterisks = '*'.repeat(3);
            return inputString.substring(0, inputString.length - 3) + asterisks;
        }
    }








    async daysToAddInToday(daysToAdd: number) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + daysToAdd);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    async generateHash512() {
        const length = 20
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
        // const rnd = Math.random();
        // const strHash = rnd.toString() + new Date().toString();
        // return strHash.toString();
    }


    async initiatePaytmPayment(params: any): Promise<any> {
        const paytmMerchantKey = "Xv#3x9vZ%cawdcD1"
        const paytmMerchantID = "InfinA73791511910258"
        const paytmWebsiteName = "InfinAWEB"
        const paytmCustId = "250"
        const orderId = "INFY_" + Date.now()
        const url = 'https://securegw.paytm.in/order/sendpaymentrequest';
        const bodyData = {
            mid: paytmMerchantID,
            merchantOrderId: orderId,
            amount: '1303.00',
            userPhoneNo: '7777777777',
            posId: 'S1234_P1235',
        }
        const signature = await Paytm.generateSignature(bodyData, paytmMerchantKey)
        const data = {
            body: bodyData,
            head: {
                clientId: 'C11',
                version: 'v1',
                signature: signature,
            },
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async getPaytmOrderStatus(params: any, signature: string) {
        try {
            const iData = {
                body: params,
                head: {
                    signature: signature
                }
            }
            const response = await axios.post('https://securegw.paytm.in/v3/order/status', iData);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (error) {
            throw error;
        }
    }

    async calculateWarrantyDates(planName, invoicedate_productdetails) {
        let extendedwarrantystartdate = '';
        let extendedwarrantyenddate = '';
        let adpstartdate = '';
        let adpenddate = '';
        switch (planName) {
            case '1 Year Extended Warranty':
                extendedwarrantystartdate = invoicedate_productdetails;
                extendedwarrantyenddate = await this.daysToAddInToday(364);
                break;
            case '2 Years Extended Warranty':
                extendedwarrantystartdate = invoicedate_productdetails;
                extendedwarrantyenddate = await this.daysToAddInToday(729);
                break;
            case '1 Year Accidental Damage Protection':
                adpstartdate = invoicedate_productdetails;
                adpenddate = await this.daysToAddInToday(364);
                break;
            case '1 Year Extended Warranty with 1 Year ADP':
                extendedwarrantystartdate = invoicedate_productdetails;
                extendedwarrantyenddate = await this.daysToAddInToday(364);
                adpstartdate = invoicedate_productdetails;
                adpenddate = await this.daysToAddInToday(364);
                break;
            default:
                break;
        }
        return {
            extendedwarrantystartdate,
            extendedwarrantyenddate,
            adpstartdate,
            adpenddate,
        };
    }

    async generateUniqueOrderId() {
        const timestamp = new Date().getTime().toString(16);
        const randomPart = Math.random().toString(16).substr(2, 4);
        const orderId = `${timestamp}-${randomPart}`;
        return orderId;
    }

    async getPeriodDates(title: string) {
        const currentDate = new Date();
        var startDate = new Date(currentDate);
        var endDate = new Date(currentDate);
        switch (title) {
            case `Today's Sales`:
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'MTD Sales':
                startDate.setDate(1);
                const nextMonth = new Date(currentDate);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                endDate = new Date(nextMonth)
                break;
            case 'QTD Sales':
                startDate.setMonth(Math.floor(currentDate.getMonth() / 3) * 3);
                startDate.setDate(1);
                startDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 3);
                endDate = new Date(endDate);
                break;
            case 'YTD Sales':
                const currentYear = currentDate.getFullYear();
                startDate = new Date(currentYear, 3, 1);
                const nextFiscalYear = new Date(startDate);
                nextFiscalYear.setFullYear(nextFiscalYear.getFullYear() + 1);
                endDate = new Date(nextFiscalYear);
                break;
            default:
                startDate = new Date(2015, 3, 1);
                endDate = new Date(endDate);
                break;
        }
        return { startDate, endDate };
    }

    async calculateDuration(startTime: Date, endTime: Date) {
        const durationInSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        return `${hours < 10 ?  '0'+hours : hours }:${minutes < 10 ?  '0'+minutes : minutes }:${seconds < 10 ?  '0'+seconds : seconds } `
    }


}
