import { Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/converter/Converter';
import { User } from '../../../domain/model/User';
import { UserTypeOrm } from '../model/UserTypeOrm';

@Injectable()
export class UserTypeOrmToUserConverter
  implements Converter<UserTypeOrm, User>
{
  public convert(userTypeOrm: UserTypeOrm): User {
    const user: User = {
      id: userTypeOrm.id,
      name: userTypeOrm.name,
    };

    return user;
  }
}
