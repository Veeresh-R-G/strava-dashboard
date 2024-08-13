'use client'

import React from "react";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

interface MyObject {
    athelete_name: string;
    total_kilometers: number;
    photoUrl: string;
}

export default function App({ data }: { data: MyObject[] }) {
    return (
        <div className="mx-1 md:mx-0 md:w-2/3">

            <Table aria-label="">
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>{""}</TableColumn>
                    <TableColumn>Distance</TableColumn>
                </TableHeader>
                <TableBody>

                    <TableRow key="1">
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Zoey Lang</TableCell>
                        <TableCell>Technical Lead</TableCell>
                        <TableCell>Technical Lead</TableCell>
                        <TableCell>Paused</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
