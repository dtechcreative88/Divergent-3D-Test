import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./App.css";

export default function App() {
  const WarehouseZone = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const Shelves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [buttonStatus, setButtonStatus] = useState(false);
  const [selectedZone, setSelectedZone] = useState(0);
  const [selectedShelves, setSelectedShelves] = useState(0);
  const [selectedItemName, setSelectedItemName] = useState();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    if (
      selectedZone !== 0 &&
      selectedShelves !== 0 &&
      selectedItemName !== undefined
    ) {
      setButtonStatus(true);
    }
  }, [selectedZone, selectedShelves, selectedItemName]);

  function resetValues() {
    setSelectedZone(0);
    setSelectedShelves(0);
    setSelectedItemName(undefined);
  }

  const onSubmit = () => {
    let prevList = [];
    let obj = {
      id: `zn-${selectedZone}-sh-${selectedShelves}-${selectedItemName}`,
      zone: selectedZone,
      shelves: selectedShelves,
      itemName: selectedItemName,
    };
    prevList = [obj, ...itemList];
    setItemList(prevList);
    resetValues();
    return false;
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container spacing={2} xs={4}>
        <table>
          <tr>
            <td>
              <h5>SELECT ZONE</h5>
            </td>
            <td> : </td>
            <td>
              <Grid container>
                <Grid item>
                  <Select
                    value={selectedZone}
                    label="Select Zone"
                    onChange={(event) => setSelectedZone(event.target.value)}
                    autoWidth
                  >
                    <MenuItem
                      value={0}
                      key={`zone-${0}`}
                      defaultChecked={true}
                      checked={true}
                      disabled
                    >
                      Select Zone
                    </MenuItem>
                    {WarehouseZone.map((item) => {
                      return (
                        <MenuItem value={item} key={`zone-${item}`}>
                          zone - {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>
            </td>
          </tr>

          <tr>
            <td>
              <h5>SELECT SHELVES</h5>
            </td>
            <td>: </td>
            <td>
              <Grid container>
                <Grid item>
                  <Select
                    value={selectedShelves}
                    label="Select Shelves"
                    onChange={(event) => setSelectedShelves(event.target.value)}
                    autoWidth
                  >
                    <MenuItem
                      value={0}
                      key={`shelves-${0}`}
                      defaultChecked={true}
                      checked={true}
                      disabled
                    >
                      Select Shelves
                    </MenuItem>
                    {Shelves.map((item) => {
                      return (
                        <MenuItem value={item} key={`shelves-${item}`}>
                          shelves - {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>
            </td>
          </tr>

          <tr>
            <td>
              <h5>ITEM NAME</h5>
            </td>
            <td>: </td>
            <td>
              <Grid container>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Item name"
                    variant="outlined"
                    defaultValue={selectedItemName && selectedItemName}
                    onChange={({ target }) => setSelectedItemName(target.value)}
                  />
                </Grid>
              </Grid>
            </td>
          </tr>

          <tr>
            <td colSpan={3}>
              <Divider />
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>
              <Grid container>
                <Grid item>
                  <Button
                    variant="contained"
                    disabled={!buttonStatus}
                    onClick={() => onSubmit()}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </td>
          </tr>
        </table>

        <table border="1" cellPadding={5} cellSpacing={5}>
          <th>
            <td>Unique Id</td>
            <td>Zone</td>
            <td>Shelf</td>
            <td>Item Name</td>
          </th>
          {itemList.length > 0 ? (
            itemList?.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.zone}</td>
                  <td>{item.shelves}</td>
                  <td>{item.itemName}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No items in list</td>
            </tr>
          )}
        </table>
      </Grid>
    </Box>
  );
}
