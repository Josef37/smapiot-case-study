import { format } from 'date-fns'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const TimestampList = ({ data, getTimestamp, getContent, emptyMsg }) => (
  data?.length
    ? (
      <List style={{ paddingTop: 0 }}>{
        data.map((item, index) =>
          <ListItem key={index}>
            <ListItemText>
              <Typography style={{ color: "darkgrey" }}>
                {"[" + format(getTimestamp(item), "yyyy-MM-dd") + "]"}
              </Typography>
              <Typography style={{ fontSize: "1.2em", whiteSpace: "pre" }}>
                {getContent(item)}
              </Typography>
            </ListItemText>
          </ListItem>
        )
      }</List>
    ) : (
      <Typography style={{ padding: 8 }}>{emptyMsg || "No data"}</Typography>
    )
)

export default TimestampList