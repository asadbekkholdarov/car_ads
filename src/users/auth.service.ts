import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}

  async signup(email: string, password: string){
    // check email exist
    const users = this.usersService.findAllUsers()
    const existUser = (await users).find(e=>e.email == email)
    if(existUser) throw new BadRequestException('Email already used')

    // hash users password 
    // generate salt
    const salt = randomBytes(8).toString('hex')
    
    // hash the salt and the password together
    const hash = await scrypt(password, salt, 32) as Buffer
    const result = salt + "." + hash.toString('hex')

    // create a new user and save it
    const user = this.usersService.create(email, result)

    // return user
    return user
  }

  async signin(email:string, password: string){
    const users =await this.usersService.findAllUsers()
    
    const existUser = (await users).find(e=>e.email==email)
    if(!existUser) throw new NotFoundException('User not found')

    const [salt, storedHash] = existUser.password.split('.')

    const hash = await scrypt(password, salt, 32) as Buffer

    if(storedHash !== hash.toString('hex')){
      throw new BadRequestException('bad password')
    }

    return existUser
  }
}