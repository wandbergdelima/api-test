import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose/dist';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:admin@database0.xzcujeb.mongodb.net/test'), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
