import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface Props {
  onClose: () => void;
}

const collapseIds = ['iRDT', 'VDW'] as const;
type CollapseId = typeof collapseIds[number];

export default function NavigationList({ onClose }: Props) {
  const classes = useStyles();
  const [opens, setOpens] = useState<CollapseId[]>([]);

  const toggleOpens = useCallback(
    (key: CollapseId) => {
      if (opens.includes(key)) {
        setOpens(opens.filter((o) => o !== key));
      } else {
        setOpens(opens.concat(key));
      }
    },
    [opens],
  );

  return (
    <div className={classes.list}>
      <List>
        <Link href="/">
          <ListItem button onClick={onClose}>
            <ListItemText primary="ホーム" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List
        component="nav"
        aria-labelledby="Tools"
        subheader={
          <ListSubheader component="div" id="tools">
            Tools
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => toggleOpens('iRDT')}>
          <ListItemText primary="iRDT" />
          {opens.includes('iRDT') ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={opens.includes('iRDT')} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/iRDT/sdof-opt-params">
              <ListItem button className={classes.nested}>
                <ListItemText primary="最適解 - 1質点系" />
              </ListItem>
            </Link>
            <Link href="/iRDT/mdof-opt-params">
              <ListItem button className={classes.nested}>
                <ListItemText primary="最適解 - 多質点系" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <ListItem button onClick={() => toggleOpens('VDW')}>
          <ListItemText primary="VDW" />
          {opens.includes('VDW') ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={opens.includes('VDW')} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/VDW/force">
              <ListItem button className={classes.nested}>
                <ListItemText primary="減衰特性" />
              </ListItem>
            </Link>
            <Link href="/VDW/weight">
              <ListItem button className={classes.nested}>
                <ListItemText primary="重量" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={onClose}>
          <ListItemText primary="利用規約" />
        </ListItem>
      </List>
    </div>
  );
}
