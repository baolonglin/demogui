'use strict';

import React from 'react';
import { FormattedMessage } from 'react-intl-es6';
import { Input } from 'react-bootstrap';

export default class UserBasicInformation extends React.Component {

  constructor() {
    super();
  }
  
  static contextTypes = {
    intl: React.PropTypes.object
  };

  render() {
    return (
      <form className="form-horizontal">
       <Input type="text" label={this.context.intl.getMessage('user.account_id')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
       <Input type="text" label={this.context.intl.getMessage('user.name')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
       <Input type="select" label={this.context.intl.getMessage('user.sex')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" >
       <option value="M">{this.context.intl.getMessage('user.man')}</option>
       <option value="F"><FormattedMessage message={this.context.intl.getMessage('user.female')}/></option>
       </Input>
      </form>
    );
  }
};
