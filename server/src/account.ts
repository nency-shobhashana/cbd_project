import * as express from 'express';
import moment = require('moment');

export const accountRouter = (events) => {

  events.getRequest(
    '/account',
    `SELECT * from account WHERE approved =1 `
    , () => []);

  events.getRequest(
    '/account/customer/:id',
    `SELECT * from account WHERE cust_id = ? AND approved =1`,
    (req: express.Request) => [req.params.id]
  );

  events.getRequest(
    '/account/:id',
    `SELECT * from account WHERE acc_no = ? AND approved =1 `,
    (req: express.Request) => [req.params.id]
  );
  events.putRequest(
    '/account',
    `INSERT INTO account ( acc_type, acc_bal, createdDate, cust_id, emp_id, approved) VALUES (?,?,?,?,?,0);
    `,
    (req: express.Request) => {
      return [
        req.body.acc_type,
        req.body.acc_bal,
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.cust_id,
        req.body.emp_id
      ];
    });

  events.deleteRequest(
    '/account/:id',
    `DELETE FROM account WHERE acc_no = ?`,
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/account/:id',
    'UPDATE account SET ' +
    'acc_type=?, acc_bal=?, createdDate=?, cust_id=?' +
    ' WHERE acc_no = ?',
    (req: express.Request) => {
      return [
        req.body.acc_type,
        req.body.acc_bal,
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.cust_id,
        req.params.id
      ];
    }
  );
};
