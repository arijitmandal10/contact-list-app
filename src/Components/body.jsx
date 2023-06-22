import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Body = () => {
	const [contact, setContact] = useState([]);
	const [searchtext, setSearchtext] = useState('');
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		city: '',
		phone: '',
	});
	const [lastId, setLastId] = useState(10);
	const [editMode, setEditMode] = useState(false);
	const [editUser, setEditUser] = useState(null);
	const [refreshData, setRefreshData] = useState(false);

	useEffect(() => {
		getContactList();
	}, [refreshData]);

	async function getContactList() {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/users');
			const json = await response.json();
			setContact(json);
		} catch (error) {
			console.log('Error fetching contact list:', error);
		}
	}

	const handleDelete = async (contactId) => {
		try {
			await fetch(`https://jsonplaceholder.typicode.com/posts/${contactId}`, {
				method: 'DELETE',
			});
			// Update the contact list after successful deletion
			setContact((prevContact) => prevContact.filter((contact) => contact.id !== contactId));
			toast.success('Contact deleted successfully!');
		} catch (error) {
			console.log('Error deleting contact:', error);
		}
	};

	const handleInputChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handleCreateUser = async (e) => {
		e.preventDefault();

		try {
			if (editMode) {
				// Perform update operation
				const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${editUser.id}`, {
					method: 'PUT',
					body: JSON.stringify({
						id: editUser.id,
						name: newUser.name,
						email: newUser.email,
						address: {
							city: newUser.city,
						},
						phone: newUser.phone,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to update user');
				}

				// Update the user in the contact list
				const updatedUser = await response.json();
				setContact((prevContact) => prevContact.map((user) => (user.id === updatedUser.id ? updatedUser : user)));

				// Reset the form and edit mode
				setNewUser({
					name: '',
					email: '',
					city: '',
					phone: '',
				});
				setEditMode(false);
				setEditUser(null);

				toast.success('User updated successfully!');
			} else {
				// Perform create operation
				const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					body: JSON.stringify({
						name: newUser.name,
						email: newUser.email,
						address: {
							city: newUser.city,
						},
						phone: newUser.phone,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});

				if (!response.ok) {
					throw new Error('Failed to create user');
				}

				const newUserJson = await response.json();

				setNewUser({
					name: '',
					email: '',
					city: '',
					phone: '',
				});

				const newId = lastId + 1;
				setLastId(newId);
				newUserJson.id = newId;

				setContact((prevContact) => [...prevContact, newUserJson]);

				toast.success('User created successfully!');
			}
		} catch (error) {
			console.log('Error creating/updating user:', error);
			toast.error('Failed to create/update user');
		}
	};

	const handleEdit = (user) => {
		setEditMode(true);
		setEditUser(user);

		// Populate the form fields with the user's data
		setNewUser({
			name: user.name,
			email: user.email,
			city: user.address.city,
			phone: user.phone,
		});
	};

	return (
		<div className='app'>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>City</th>
						<th>Mobile</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{contact
						.filter((contact) => {
							return searchtext.toLowerCase() === ' ' ? contact : contact?.name.toLowerCase().includes(searchtext);
						})
						.map((contact) => {
							return (
								<tr key={contact.id}>
									<td>{contact?.id}.</td>
									<td>{contact?.name}</td>
									<td>{contact?.email}</td>
									<td>{contact?.address?.city}</td>
									<td>{contact?.phone}</td>
									<td>
										<button style={{ backgroundColor: '#ff2929' }} onClick={() => handleDelete(contact.id)}>
											delete
										</button>
										&nbsp; &nbsp;
										<button style={{ backgroundColor: 'lime' }} onClick={() => handleEdit(contact)}>
											edit
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>

			<div className='container'>
				<div className='searchBar'>
					<input type='text' placeholder='search name' value={searchtext} onChange={(e) => setSearchtext(e.target.value)} />
				</div>
				{/* Input form for creating/updating a user */}
				<div className='contactform'>
					<form onSubmit={handleCreateUser}>
						<input type='text' name='name' placeholder='Name' value={newUser.name} onChange={handleInputChange} />
						<br />
						<input type='text' name='email' placeholder='Email' value={newUser.email} onChange={handleInputChange} />
						<br />
						<input type='text' name='city' placeholder='City' value={newUser.city} onChange={handleInputChange} />
						<br />
						<input type='text' name='phone' placeholder='Phone' value={newUser.phone} onChange={handleInputChange} />
						<br />
						<button type='submit'>{editMode ? 'Update' : 'Create User'}</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Body;
