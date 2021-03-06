import * as express from 'express';
import moment = require('moment');

export const loanAccountRouter = (events) => {

  events.getRequest(
    '/loan_account',
    `SELECT * from loan_account WHERE approved = 1 `
    , () => []);

  events.getRequest(
    '/loan_account/customer/:id',
    `SELECT * from loan_account WHERE cust_id = ? AND approved = 1 `,
    (req: express.Request) => [req.params.id]
  );

  events.getRequest(
    '/loan_account/:id',
    `SELECT * from loan_account WHERE loan_id = ? AND approved = 1 `,
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/loan_account',
    `INSERT INTO loan_account ( loan_type, interest, duration, amount, start_date, remain_amt, cust_id, emp_id, approved) VALUES (?,?,?,?,?,?,?,?,0);
    `,
    (req: express.Request) => {
      return [
        req.body.loan_type,
        req.body.interest,
        req.body.duration,
        req.body.amount,
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.remain_amt,
        req.body.cust_id,
        req.body.emp_id
      ];
    });

  events.deleteRequest(
    '/loan_account/:id',
    `DELETE FROM loan_account WHERE loan_id = ?`,
    (req: express.Request) => [req.params.id]
  );

  events.putRequest(
    '/loan_account/:id',
    'UPDATE loan_account SET ' +
    'loan_type=?, interest=?, duration=?, amount=?, start_date=?, remain_amt=?, cust_id=?' +
    ' WHERE loan_id = ?',
    (req: express.Request) => {
      return [
        req.body.loan_type,
        req.body.interest,
        req.body.duration,
        req.body.amount,
        moment(req.body.createdDate).format('yyyy-MM-DD'),
        req.body.remain_amt,
        req.body.cust_id,
        req.params.id
      ];
    }
  );
};
