import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    // inserindo as variaveis dentro do modelo e salvando o usuário.
    const user = new this.userModel(createUserDto);
    return user.save(); 
  }

  findAll() {
    return this.userModel.find();
  }
// procurando os dados pelo id
  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        // sem o atributo set: ele serve para alterar os campos que eu quero. 
        $set: updateUserDto,
      },
      {
        // essa atribuição é indispençavel pois ela pega as informações do objeto que eu quero alterar e altera no meu banco de dados, se não tiver essa opção ele não salva as alterações.
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    })
    // para conseguir executar essa operação.
    .exec();
  }
}
