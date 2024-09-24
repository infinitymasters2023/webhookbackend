/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectionPool, Request } from 'mssql';
import { CustomerDataDTO, InsertCustomerCartDto, LoginByOtpDto, SendOTPMultiFactorDto,

    newLoginByOtpDto  ,newcustomerlogininfoDTO
 } from '../dtos/auth.dto';



@Injectable()
export class AuthService {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly pool: ConnectionPool,
        private readonly jwtService: JwtService
    ) { }
     
    async findOneByUserName(loginid: string): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('Type',15);
            request.input('Loginid',loginid);
            // request.input('Password',Password)
            const result = await request.execute('sp_nestjs_buyinfyshield');
            const insertedData = result.recordsets[0][0];   
            return insertedData;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }

      
  async clientlogin(contactpersonmobileno: string){
    try {
        const poolConnection = await this.pool.connect();
        const request = new Request(poolConnection);
        request.input('processtype', 6);
        request.input('contactpersonmobileno', contactpersonmobileno);
        const result = await request.execute('smartpingInsertMessageData');
        const insertedData = result.recordsets[0];
        console.log('insertedData', insertedData);
        return insertedData;
    } catch (error) {
        throw error;
    } finally {
        if (this.pool.connected) {
            await this.pool.close();
        }
    }

}



async addresslogin(mobileno: string){
    const poolConnection = await this.pool.connect();
    try {
       
        const request = poolConnection.request();
        request.input('Type', 45);
        request.input('mobileno', mobileno);
        const result = await request.execute('sp_nestjs_buyinfyshield');
        const insertedData = result.recordsets[0];
        console.log('insertedData', insertedData);
        return insertedData;
    } catch (error) {
        throw error;
    }  finally {
        poolConnection.release();
    }
    

}


async userclientlogin(userid: string){
    try {
        const poolConnection = await this.pool.connect();
        const request = new Request(poolConnection);
        request.input('Type', 38);
        request.input('userid', userid);
        const result = await request.execute('sp_nestjs_buyinfyshield');
        const insertedData = result.recordsets[0];
        console.log('insertedData', insertedData);
        return insertedData;
    } catch (error) {
        throw error;
    } finally {
        if (this.pool.connected) {
            await this.pool.close();
        }
    }

}


    async findOneByUser(sendOTPMultiFactorDto:SendOTPMultiFactorDto): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('Type',17);
            request.input('contactpersonemailid',sendOTPMultiFactorDto.email);
            request.input('mobileno',sendOTPMultiFactorDto.mobile);
            const result = await request.execute('sp_nestjs_buyinfyshield');
            const insertedData = result.recordsets[0][0];
            return insertedData;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }

/************************************************************************************************************************************************************************ */
    async newupdateOtponBoth(newcustomerlogininfoDTO:newcustomerlogininfoDTO): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('processtype',6);
            request.input('mobileno',newcustomerlogininfoDTO.mobile);
            // request.input('email', newcustomerlogininfoDTO.email);
            
            const result = await request.execute('smartpingInsertMessageData');
            const insertedData = result.recordsets[0];
            return insertedData;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }

    async validateUser(passwordString: string, passwordHash: string): Promise<boolean> {
        return (passwordString === passwordHash) ? true : false
        // return this.helperService.bcryptCompare(passwordString, passwordHash);
    }

    async generateToken(payload: Record<string, any>): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string): Promise<Record<string, any>> {
        return this.jwtService.verify(token);
    }


    async updateUserOtpByMobile(sendOTPMultiFactorDto:LoginByOtpDto): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('processtype',7);
            request.input('otp',sendOTPMultiFactorDto.otp);
           // request.input('mobileno',sendOTPMultiFactorDto.mobile);
            const result = await request.execute('smartpingInsertMessageData');
            const insertedData = result.recordsets[0];
            return insertedData;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }

    /********************************************************************************************************************************************************************** */
    async findUserMobileNo(mobile:string): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('Type',46);
            request.input('mobileno',mobile);
            const result = await request.execute('sp_nestjs_buyinfyshield');
            const insertedData = result.recordsets[0][0];
            return insertedData;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }

    async findOneMobileNo(mobile:string): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('Type',34);
            request.input('mobileno',mobile);
            const result = await request.execute('sp_nestjs_buyinfyshield');
            const insertedData = result.recordsets[0][0];
            return insertedData;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }
  
    async updateOtpByMobile(sendOTPMultiFactorDto:LoginByOtpDto): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('processtype',7);
            request.input('otp',sendOTPMultiFactorDto.otp);
            request.input('mobileno',sendOTPMultiFactorDto.mobile);
            const result = await request.execute('smartpingInsertMessageData');
            const insertedData = result.recordsets[0];
            return insertedData;
        } catch (error) {
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }
    async updateOtponboth(newLoginByOtpDto:newLoginByOtpDto): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('Type',43);
            request.input('otp',newLoginByOtpDto.otp);
            request.input('mobileno',newLoginByOtpDto.mobile);
            request.input('email',newLoginByOtpDto.email);
            const result = await request.execute('sp_nestjs_buyinfyshield');
            const insertedData = result.recordsets[0];
            return insertedData;
        } catch (error) {  
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }


 
  


    async newcustomerdataupdate(customerDataDTO:CustomerDataDTO): Promise<any> {
        try {
            const poolConnection = await this.pool.connect();
            const request = new Request(poolConnection);
            request.input('Type',44);
            request.input('mobileno',customerDataDTO.mobile);
            request.input('addressLine1',customerDataDTO.addressLine1);
            request.input('addressLine2',customerDataDTO.addressLine2);
            request.input('addressLine3',customerDataDTO.addressLine3);
            request.input('city',customerDataDTO.city);
            request.input('customerName',customerDataDTO.customerName);
            request.input('pincode',customerDataDTO.pincode);
            request.input('state', customerDataDTO.state);
            request.input('brand', customerDataDTO.brand);
            request.input('planDuration', customerDataDTO.planDuration);
            request.input('devicePrice', customerDataDTO.devicePrice);
            request.input('ORDERID', customerDataDTO.ORDERID);
            request.input('email', customerDataDTO.email);
            
            const result = await request.execute('sp_nestjs_buyinfyshield');
            const insertedData = result.recordsets[0];
            return insertedData;
        } catch (error) {   
            console.log('error', error);
            throw error;
        } finally {
            if (this.pool.connected) {
                await this.pool.close();
            }
        }
    }

     async newupdateOtpByMobile(sendOTPMultiFactorDto:LoginByOtpDto): Promise<any> {
         try {
             const poolConnection = await this.pool.connect();
             const request = new Request(poolConnection);
             request.input('Type',37);
             request.input('otp',sendOTPMultiFactorDto.otp);
             request.input('mobileno',sendOTPMultiFactorDto.mobile);
             const result = await request.execute('sp_nestjs_buyinfyshield');
             const insertedData = result.recordsets[0];
             return insertedData;
         } catch (error) {
             console.log('error', error);
             throw error;
         } finally {
             if (this.pool.connected) {
                 await this.pool.close();
             }
         }
     }
    //  async insertCustomerDataFromJSON(jsonData: string): Promise<void> {
    //     try {
    //         const poolConnection = await this.pool.connect()
    //             const request = new Request(poolConnection);
    //             request.input('Type',41);
    //       // Your code to parse JSON and insert data into the database
    //     } catch (error) {
    //       console.log('error', error);
    //       throw error;
    //     } finally {
    //       if (this.pool.connected) {
    //         await this.pool.close();
    //       }
    //     }
    //   }

  async insertCustomerCartDto(insertCustomerCartDto: InsertCustomerCartDto): Promise<any> {
    try {
        const poolConnection = await this.pool.connect();
        const request = new Request(poolConnection);

        // Input values that can have multiple entries
        request.input('Type', 41);
        request.input('Plan', insertCustomerCartDto.Plan);
        request.input('Price', insertCustomerCartDto.Price);
        request.input('ProductSubCatgID', insertCustomerCartDto.ProductSubCatgID);
        request.input('Status', insertCustomerCartDto.Status);
        request.input('email', insertCustomerCartDto.userEmail);
        request.input('mobileno', insertCustomerCartDto.userMobile);
        request.input('userid', insertCustomerCartDto.userid);

        // Input values with multiple entries
        if (insertCustomerCartDto.brand) {
            insertCustomerCartDto.brand.forEach((brand, index) => {
                request.input(`brand_${index}`, brand);
            });
        }
        if (insertCustomerCartDto.invoiceamount) {
            insertCustomerCartDto.invoiceamount.forEach((amount, index) => {
                request.input(`invoiceamount_${index}`, amount);
            });
        }
        if (insertCustomerCartDto.invoicedate) {
            insertCustomerCartDto.invoicedate.forEach((date, index) => {
                request.input(`invoicedate_${index}`, date);
            });
        }
        if (insertCustomerCartDto.subcategoryid) {
            insertCustomerCartDto.subcategoryid.forEach((id, index) => {
                request.input(`subcategoryid_${index}`, id);
            });
        }

        const result = await request.execute('sp_nestjs_buyinfyshield');
        const insertedData = result.recordsets;
        return insertedData;
    } catch (error) {
        console.log('error', error);
        throw error;
    } finally {
        if (this.pool.connected) {
            await this.pool.close();
        }
    }
}

    

      
}