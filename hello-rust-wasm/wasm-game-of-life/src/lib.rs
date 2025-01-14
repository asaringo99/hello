use std::fmt;
mod utils;
use wasm_bindgen::prelude::*;
extern crate web_sys;
use web_sys::console;

macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).info());
    };
}

pub struct  Timer<'a> {
    name: &'a str,
}

impl<'a> Timer<'a> {
    pub fn new(name: &'a str) -> Timer<'a> {
        console::time_with_label(name);
        Timer {name}
    }
}

impl<'a> Drop for Timer<'a> {
    fn drop(&mut self) {
        console::time_end_with_label(self.name);
    }
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Arrive = 1,
}

impl Cell {
    fn toggle(&mut self) {
        *self = match *self {
            Cell::Arrive => Cell::Dead,
            Cell::Dead => Cell::Arrive,
        };
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

impl Universe {
    fn get_index(&self, row: u32, col: u32) -> usize {
        (self.width * row + col) as usize
    }

    fn live_neighbor_count(&self, row: u32, col: u32) -> u8 {
        let mut count = 0;
        for dr in [self.height - 1, 0, 1] {
            for dc in [self.width - 1, 0, 1] {
                if dr == 0 && dc == 0 {
                    continue;
                }
                let nrow = (row + dr + self.height) % self.height;
                let ncol = (col + dc + self.width) % self.width;
                let idx = self.get_index(nrow, ncol);
                count += self.cells[idx] as u8
            }
        }
        count
    }
}

impl Universe {
    pub fn get_cells(&self) -> &[Cell] {
        &self.cells
    }

    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells[idx] = Cell::Arrive;
        }
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        let _timer = Timer::new("Universe::tick");
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let neighbors_live_count = self.live_neighbor_count(row, col);
                let next_cell = match (cell, neighbors_live_count) {
                    (Cell::Arrive, x) if x < 2 => Cell::Dead,
                    (Cell::Arrive, 2) | (Cell::Arrive, 3) => Cell::Arrive,
                    (Cell::Arrive, x) if x > 3 => Cell::Dead,
                    (Cell::Dead, 3) => Cell::Arrive,
                    (otherwize, _) => otherwize,
                };
                next[idx] = next_cell;
            }
        }
        self.cells = next
    }

    pub fn toggle_cell(&mut self, row: u32, col: u32) {
        let idx = self.get_index(row, col);
        self.cells[idx].toggle();
    }

    pub fn new() -> Universe {
        utils::set_panic_hook();

        let width = 64;
        let height = 64;

        let clodure = |i| {
            if i % 2 == 0 || i % 7 == 0 {
                Cell::Arrive
            } else {
                Cell::Dead
            }
        };
        let cells = (0..width * height).map(clodure).collect();
        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }
    
    pub fn height(&self) -> u32 {
        self.height
    }
    
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn render(&self) -> String {
        self.to_string()
    }
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_i| Cell::Dead).collect();
    }

    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        self.cells = (0..self.width * height).map(|_i| Cell::Dead).collect();
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}
