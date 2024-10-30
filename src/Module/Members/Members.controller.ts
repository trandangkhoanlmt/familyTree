import { Controller } from '@nestjs/common';
import { MemberService } from './Members.service';

@Controller('api/v1/Members')
export class MemberController {
  constructor(public MemberService: MemberService) {}
}
