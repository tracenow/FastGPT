import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@fastgpt/service/common/response';
import { connectToDatabase } from '@/service/mongo';
import { authCert } from '@fastgpt/service/support/permission/auth/common';
import { addHours } from 'date-fns';

import { MongoTeamMember } from '@fastgpt/service/support/user/team/teamMemberSchema';
import { TeamMemberSchema } from "@fastgpt/global/support/user/team/type";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();
        await authCert({ req, authRoot: true });

        const teamMember = req.body as TeamMemberSchema;

        const response = await MongoTeamMember.deleteOne({
            _id: teamMember._id
        });

        jsonRes(res, {
            data: response
        });
    } catch (error) {
        console.log(error);

        jsonRes(res, {
            code: 500,
            error
        });
    }
}