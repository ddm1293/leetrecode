import './PopUp.css'
import { ThemeProvider, Box, createTheme, Grid2, IconButton, Tooltip, Typography } from '@mui/material';
import { AiFillSetting } from 'react-icons/ai';
import { Item } from './components/Item.tsx';
import { MyPie } from "./components/Pie.tsx";
import { AcStackBar } from './components/AcStackBar.tsx';
import { useEffect, useState } from 'react';
import { User } from '../common/models.ts';
import { getStoredUser } from '../common/storage.ts';

const theme = createTheme({
    typography: {
        fontFamily: "Raleway, sans-serif",
    },
});

export const mockUser: User = {
    email: "testuser@example.com",
    _id: "user12345",
    performance: {
        today_ac_count: 5,
        today_num_question: 7,
        avg_memory_percent: 85.3,
        avg_time_percent: 72.5,
        finishedEasy: ["easy1", "easy2", "easy3"],
        finishedMedium: ["medium1", "medium2"],
        finishedHard: ["hard1"]
    }
};

function PopUp() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getStoredUser().then((user) => {
            console.log("popup user");
            console.log(user);
            setUser(user);
        }).catch(() => {
            setUser(mockUser);  // Use mock data if fetching fails
        });
    }, []);


    if (!user) {
        return (
            <Typography variant="h6" align="center">
                Loading data...
            </Typography>
        );
    }

    return (
      <ThemeProvider theme={theme}>
          <div>
            <div>
              <Box
                  sx={{
                    bgcolor: "orange",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    py: 0.5,
                  }}
              >
                <Box
                    sx={{
                      fontStyle: "italic",
                      fontFamily: "Raleway",
                      typography: "h5",
                      display: "inline",
                    }}
                >
                  LeetReCode
                </Box>
                <Tooltip title="Options">
                  <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
                    <AiFillSetting size={25} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="subtitle1">Today's Stats:</Typography>
              <Grid2 container direction="column">
                <Item
                    label={"AC Rate"}
                    value={(
                        Math.round(
                            (user.performance.today_ac_count /
                                user.performance.today_num_question) *
                            100
                        ) / 100
                    ).toFixed(2)}
                />
                <Item
                    label={"Avg Runtime"}
                    value={`${Math.round(user.performance.avg_time_percent)} ms`}
                />
                <MyPie
                    easy={user.performance.finishedEasy.length}
                    medium={user.performance.finishedMedium.length}
                    hard={user.performance.finishedHard.length}
                />
                <AcStackBar
                    total={user.performance.today_num_question}
                    ac_count={user.performance.today_ac_count}
                />
              </Grid2>
            </div>
          </div>
      </ThemeProvider>
    )
}

export default PopUp
