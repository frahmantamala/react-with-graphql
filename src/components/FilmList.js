import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Collapse, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ExpandableItem from "../shared/ExpandableItem";

const ALL_FILMS = gql`
  {
    allFilms {
      films{
        id
        title
        releaseDate
        producers
      }
    }
  }
`;

const ListFilms = () => {
  const { data, loading, error } = useQuery(ALL_FILMS);

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error</div>
  }

  return data.allFilms.films.map(({ id, title, releaseDate, producers }) => (
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', }} key={id}>
      <ExpandableItem
        render={xprops => (
          <>
            <ListItem button onClick={() => xprops.setOpen(!xprops.open)}>
              <ListItemText primary={title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Release Date {releaseDate}
                    </Typography>

                  </React.Fragment>
                } />
              {xprops.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={xprops.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }} >
                  <ListItemText primary="Producers by"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {producers}
                        </Typography>

                      </React.Fragment>
                    } />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
      />
    </List>
  ));
}

export default ListFilms;