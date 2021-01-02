import { Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Heading } from '@chakra-ui/react';
import { fetchTeam } from '../../shared/utils/UserTeamApi';
import React, { useEffect, useState } from 'react';
import { Player, UserTeam } from '../../shared/const/spencers_team';

type TeamSummaryProps = {
    id : number
}

const TeamSummary: React.FC = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [teamName, setTeamName] = useState('');
    const [owner, setOwner] = useState('');
    const [team, setTeam] = useState<Player[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = fetchTeam(1);
                setTeamName(result.name);
                setOwner(result.owner);
                setTeam(result.players);
                setIsLoading(false);
            } catch (error) {
                setError('Unable to fetch team data.');
                setIsLoading(false);
            }
        };

        fetchData();
    });

    const renderTableData = () => {
        return team.map((player: Player) => {
            const { id, name, team, gp, shots, shooting_percentage, goals } = player;
            return (
                <Tr key={id}>
                    <Td>{name}</Td>
                    <Td>{team}</Td>
                    <Td>{gp}</Td>
                    <Td>{shots}</Td>
                    <Td>{shooting_percentage}</Td>
                    <Td>{goals}</Td>
                </Tr>
            )
        });
    }

    return (
        <Flex width="full" align="center" justifyContent="center">
          <Box m={8} maxWidth="800px">
            <Heading>{teamName}</Heading>
            <Table variant="simple">
                <TableCaption>{owner}</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Team</Th>
                        <Th isNumeric>GP</Th>
                        <Th isNumeric>Shots</Th>
                        <Th isNumeric>S%</Th>
                        <Th isNumeric>Goals</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderTableData()}
                </Tbody>
            </Table>
          </Box>  
        </Flex>
        
    )
}

export default TeamSummary;