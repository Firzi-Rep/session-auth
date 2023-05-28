import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot(
    //database url string
    'mongodb+srv://firziawan20:Firzi26081106@enz.da7jszh.mongodb.net/'
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
