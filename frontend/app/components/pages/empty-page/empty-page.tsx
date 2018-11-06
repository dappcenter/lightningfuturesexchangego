import React from 'react';
import { MasterLayout } from '@/components/layouts/master/master-layout';
import { commonMessages } from '@/messages/common-messages';
import { FormattedMessage } from '@/components/widgets/intl/formatted-message';
export class EmptyPage extends React.PureComponent {
  render() {
    return (
      <MasterLayout title={<FormattedMessage {...commonMessages.emptyPage} />}>
      </MasterLayout>
    );
  }
}