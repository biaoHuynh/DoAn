import React, { useEffect, useState } from 'react';
import { Button, Col, Row, DatePicker, Space, Input } from 'antd';
import { Table } from 'components/common/Table/Table';
import { Line } from '@ant-design/plots';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import ConfigSetting from './ListFriendPageService';
import * as s from './Tables.styles';

import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { Dayjs } from 'dayjs';
import RecentActivityFeed from './RecentActivityFeed';

const ListFriendPage: React.FC = () => {
  const [activity, setActivity] = useState<any[]>([]);
  const [filteredActivity, setFilteredActivity] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState<any>({
    status: [],
  });

  useEffect(() => {
    ConfigSetting.getListFriends().then((res) => {
      console.log(res.data);
      setHasMore(false);
      setActivity(res.data);
    });
  }, []);

  const next = () => {
    ConfigSetting.getListFriends().then((newActivity: any) => setActivity(activity.concat(newActivity)));
  };

  useEffect(() => {
    if (filters.status.length > 0) {
      setFilteredActivity(activity.filter((item) => filters.status.some((filter: any) => filter === item.status)));
    } else {
      setFilteredActivity(activity);
    }
  }, [filters.status]);

  return (
    <>
      <PageTitle>List Friends</PageTitle>

      {/* <S.Card title={t('common.history_order')}>
          <Row style={{ width: '100%' }}>
            <Col>
              <Line {...config} />
            </Col>
          </Row>
        </S.Card> */}

      <s.Card title="List Friend">
        <Row style={{ width: '100%' }}>
          <RecentActivityFeed activity={activity} hasMore={hasMore} next={next} />
        </Row>
      </s.Card>
    </>
  );
};

export default ListFriendPage;
